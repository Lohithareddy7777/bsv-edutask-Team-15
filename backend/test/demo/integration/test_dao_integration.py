import pytest
from src.util.dao import DAO


@pytest.fixture
def dao_test():
    dao = DAO("user")
    yield dao
    dao.collection.delete_many({"email": {"$regex": "@test.com$"}})


def test_create_valid_user(dao_test):
    data = {
        "firstName": "Pushpak",
        "lastName": "Samuel",
        "email": "pushpak@test.com"
    }

    result = dao_test.create(data)
    assert result is not None


def test_create_without_email(dao_test):
    data = {
        "firstName": "Pushpak",
        "lastName": "Samuel"
    }

    with pytest.raises(Exception):
        dao_test.create(data)


def test_create_invalid_name_type(dao_test):
    data = {
        "firstName": 123,
        "lastName": "Samuel",
        "email": "abc@test.com"
    }

    with pytest.raises(Exception):
        dao_test.create(data)


def test_create_empty_document(dao_test):
    with pytest.raises(Exception):
        dao_test.create({})


def test_create_with_extra_field(dao_test):
    data = {
        "firstName": "Lohitha",
        "lastName": "Yarram",
        "email": "lohitha@test.com"
    }

    result = dao_test.create(data)
    assert result is not None