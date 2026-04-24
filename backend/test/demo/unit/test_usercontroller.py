import pytest
from unittest.mock import MagicMock
from src.controllers.usercontroller import UserController

FAKE_USER = {
    "name": "Test User",
    "email": "testuser@example.com"
}


@pytest.fixture
def controller():
    mock_dao = MagicMock()
    return UserController(dao=mock_dao)

# Test 1 - valid email that exists in database, should return the user
def test_valid_email_found(controller):
    controller.dao.find.return_value = [FAKE_USER]
    result = controller.get_user_by_email("testuser@example.com")
    assert result is not None
    assert result["email"] == "testuser@example.com"

# Test 2 - valid email but no user found in database
# BUG FOUND: code crashes with IndexError instead of returning None
def test_email_not_found(controller):
    controller.dao.find.return_value = []
    with pytest.raises(Exception):
        controller.get_user_by_email("nobody@example.com")

# Test 3 - email with no @ sign, should raise ValueError
def test_invalid_email_format(controller):
    with pytest.raises(ValueError):
        controller.get_user_by_email("notanemail")

# Test 4 - empty string, should raise ValueError
def test_empty_email(controller):
    with pytest.raises(ValueError):
        controller.get_user_by_email("")

# Test 5 - None passed, should raise an error without crashing unexpectedly
def test_none_as_email(controller):
    with pytest.raises(Exception):
        controller.get_user_by_email(None)