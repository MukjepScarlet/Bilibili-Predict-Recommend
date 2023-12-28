function xorEncrypt(inputString, key) {
    let encoder = new TextEncoder();
    let inputBytes = encoder.encode(inputString);
    let keyBytes = encoder.encode(key);
    let encryptedBytes = new Uint8Array(
        inputBytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length])
    );
    return btoa(String.fromCharCode(...encryptedBytes));
}

function xorDecrypt(encryptedString, key) {
    let decoder = new TextDecoder('utf-8');
    let encryptedBytes = new Uint8Array(
        atob(encryptedString)
            .split('')
            .map((char) => char.charCodeAt(0))
    );
    let keyBytes = new Uint8Array(encoder.encode(key));
    let decryptedBytes = new Uint8Array(
        encryptedBytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length])
    );
    return decoder.decode(decryptedBytes);
}

const KEY = '4of1kind';

function openLogin() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('overlay').style.display = 'none';
}

function tryLogin() {
    // Implement your code to send data to the server here
    // You can use the values of username and password fields
    // For example,
    const username = document.getElementById('username').value;
    const password = xorEncrypt(document.getElementById('password').value, KEY);

    if (username.length === 0 || password.length === 0) {
        alert('账号或密码未输入!');
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: username,
            pw: password
        })
    }).then(r => r.json()).then(data => {
        switch (data.code) {
            case -1:
                alert('登录失败, 发生错误.');
                break;
            case 0:
                alert('登录成功!');
                window.location.reload();
                break;
            case 1:
                alert('登录失败, 账号或密码错误.');
                break;
        }
    });
}

function tryRegister() {
    const username = document.getElementById('username').value;
    const password = xorEncrypt(document.getElementById('password').value, KEY);

    if (username.length === 0 || password.length === 0) {
        alert('账号或密码未输入!');
        return;
    }
    fetch('/api/regist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: username,
            pw: password
        })
    }).then(r => r.json()).then(data => {
        switch (data.code) {
            case -1:
                alert('注册失败, 发生错误.');
                break;
            case 0:
                alert('注册成功, 自动登录.');
                window.location.reload();
                break;
            case 1:
                alert('该账号已经存在!');
                break;
        }
    });
}