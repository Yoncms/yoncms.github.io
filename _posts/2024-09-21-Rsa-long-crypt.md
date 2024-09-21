---
layout: post
title: RSA长字符串加密
---
<pre>
import base64
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Cipher import PKCS1_v1_5
from Crypto.PublicKey import RSA

def ckey(n):
    key = RSA.generate(n)
    pbk = key.publickey().export_key()
    prk = key.export_key()
    return pbk, prk

# RSA加密时，对于原文数据的要求：
# 密钥模长为密钥位数除于8，比如1024位就是128，2048位就是256
# OAEP填充模式： 原文长度 <= 密钥模长 - 42
# PKCA1-V1_5填充模式：原文长度 <= 密钥模长 - 11字节


def encry(text, key, lng=80):
    rsa = PKCS1_OAEP.new(RSA.importKey(key))
    text = text.encode()
    # 如果使用OAEP模式，密钥如果是1024位的，原文的最大长度为86，
    # 2048位的最大长度是212
    if len(text)<=86:
        enc = rsa.encrypt(text)
    else:
        arr = []
        for x in range(0, len(text), lng):
            arr.append(rsa.encrypt(text[x:x+lng]))
        enc = b''.join(arr)
    # 16进制
    # enc = enc.hex()
    # base64
    enc = base64.b64encode(enc).decode()
    return enc

# 密钥长度位1024，这里是128，2048就是256
def decry(enc, prk, lng=128):
    rsa = PKCS1_OAEP.new(RSA.importKey(prk))
    # 密文是16进制的
    # enc = bytes.fromhex(enc)
    # 密文是base64的
    enc = base64.b64decode(enc)
    if len(enc)<=lng:
        decy = rsa.decrypt(enc).decode()
    else:
        arr = []
        for x in range(0, len(enc), lng):
            arr.append(rsa.decrypt(enc[x:x+lng]))
        decy = (b''.join(arr)).decode()
    return decy


if __name__ == '__main__':
    text = '''BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8oaCKen9Iu7W3YkoJFAp8I3AqNho0CyohomGnGMu+QzBC
    mwjKJF6kqJdU0nSBBBdDP2c7+cXwNycS/ElRm7+1jhmuh6JaPSHxCvLctiKLIKDIsCsW7iGuRs1MWBGcLW9jyzTh+1+ZuPinIMRhJmBfG0eeO
    JxV/QBWgRT8ZlSy8QIDAQAB-----END PUBLIC KEY----------BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQC8oaCKen9Iu7W3YkoJF
    Ap8I3AqNho0CyohomGnGMu+QzBCmwjKJF6kqJdU0nSBBBdDP2c7+cXwNycS/ElRm7+1jhmuh6JaPSHxCvLctiKLIKDIsCsW7i'''

    key = ckey(1024)
    pbk = key[0]
    prk = key[1]
    enc = encry(text, pbk)
    print('密文=>', enc)
    dec = decry(enc, prk)
    print('明文=>', dec)
</pre>
