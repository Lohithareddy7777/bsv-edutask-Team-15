import pytest
from unittest.mock import patch
from src.util.dao import DAO


@pytest.fixture
def dao_test():
    dao = DAO("user")
    yield dao
    dao.collection.delete_many({"email": {"$regex": "@test.com$"}})


@patch("src.util.dao.getValidator")
def test_create_valid_user(mock_validator, dao_test):

    mock_validator.return_value = {}

    data = {
        "firstName": "Pushpak",
        "lastName": "Samuel",
        "email": "pushpak@test.com"
    }

    result = dao_test.create(data)

    assert result is not None


@patch("src.util.dao.getValidator")
def test_create_without_email(mock_validator, dao_test):

    mock_validator.return_value = {}

    data = {
        "firstName": "Pushpak",
        "lastName": "Samuel"
    }

    with pytest.raises(Exception):
        dao_test.create(data)


@patch("src.util.dao.getValidator")
def test_create_invalid_name_type(mock_validator, dao_test):

    mock_validator.return_value = {}

    data = {
        "firstName": 123,
        "lastName": "Samuel",
        "email": "abc@test.com"
    }

    with pytest.raises(Exception):
        dao_test.create(data)


@patch("src.util.dao.getValidator")
def test_create_empty_document(mock_validator, dao_test):

    mock_validator.return_value = {}

    with pytest.raises(Exception):
        dao_test.create({})


@patch("src.util.dao.getValidator")
def test_create_with_extra_field(mock_validator, dao_test):

    mock_validator.return_value = {}

    data = {
        "firstName": "Lohitha",
        "lastName": "Yarram",
        "email": "lohitha@test.com"
    }

    result = dao_test.create(data)

    assert result is not None
