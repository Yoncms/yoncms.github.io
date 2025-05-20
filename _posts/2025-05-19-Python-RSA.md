---
layout: post
title: "RSA加密"
date: 2025-05-19
categories: 技术
tags: [RSA, Python, 博客]
featured_image: /assets/images/article13.jpg
---

<pre>
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

length = 1024

if length==1024:
    eloaep = 86
    elv1_5 = 117
    dlen = 128
else:
    aloaep = 214
    elv1_5 = 245
    dlen = 256

# 生成RSA密钥对
key = RSA.generate(length)

private_key = key.export_key()
public_key = key.publickey().export_key()

# 加密消息
message = "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message"
message += "Hello, this is a secret message xxxx"

print(len(message))

def encry(public_key, message):
    recipient_key = RSA.import_key(public_key)
    cipher_rsa = PKCS1_OAEP.new(recipient_key)
    xlen = len(message)
    entext = b''
    if xlen > eloaep:
        for i in range(0, xlen, eloaep):
            itext = message[i:i+eloaep]
            entext += bytes(cipher_rsa.encrypt(itext.encode()))
    else:
        entext = cipher_rsa.encrypt(message.encode())
    # entext = base64.b64encode(entext).decode()
    entext = entext.hex()
    print(entext)
    return entext

entext = encry(public_key, message)

def decry(private_key, entext):
    ckey = RSA.import_key(private_key)  
    cipher_rsa = PKCS1_OAEP.new(ckey)
    # entext = base64.b64decode(entext)
    entext = bytes.fromhex(entext)
    xlen = len(entext)
    detext = ''
    if xlen > dlen:
        for i in range(0, xlen, dlen):
            itext = entext[i:i+dlen]
            detext += cipher_rsa.decrypt(itext).decode()
    else:
        detext = cipher_rsa.decrypt(entext).decode()
    print(detext)
    return detext

decry(private_key, entext)

# print("Original Message:", message)
# print("Encrypted Message:", base64.b64encode(cipher_text).decode())
# print("Decrypted Message:", decrypted_message)
</pre>