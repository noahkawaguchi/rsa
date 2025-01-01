from app.calculations import RSA_calculations as rsa


def test_find_public_key():
    assert rsa.find_public_key(557, 139) == (77423, 5)


def test_find_private_key():
    p, q = 2887, 2099
    n, e = rsa.find_public_key(p, q)
    assert rsa.find_private_key(e, p, q) == 3632897


def test_encode():
    p, q = 2467, 1307
    n, e = rsa.find_public_key(p, q)
    message_with_emoji = 'RSA is awesome 🔐🛜😍'
    int_list = [ord(ch) for ch in message_with_emoji]
    encoded_ints = [pow(num, e, n) for num in int_list]
    assert rsa.encode(n, e, message_with_emoji) == encoded_ints


def test_decode():
    p, q = 67, 281
    n, e = rsa.find_public_key(p, q)
    d = rsa.find_private_key(e, p, q)
    message = 'You can use my public key.'
    int_list = [ord(ch) for ch in message]
    encoded_ints = [pow(num, e, n) for num in int_list]
    assert rsa.decode(n, d, encoded_ints) == message
