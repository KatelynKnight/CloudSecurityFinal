function encryptionButton() {
    var plaintext = document.getElementById('text').value;
    if (plaintext.length % 32 != 0) {
        //Checks if the plaintext is a multiple of 32
        alert("Your entered plaintext is " + plaintext.length + " hex digits (" + plaintext.length * 4 + " bits)!\n\n" + " The length of plaintext must be a multiple of 32 hex digits (128 bits)!\n\nPlease re-enter the plaintext!");
        document.getElementById("encryptedValue").innerHTML = "size of plaintext error";
        return false;
    }

    var key = document.getElementById('key').value;
    if (key.length != 64) {
        //Also checks if the length of the key is 64*4 = 256bits
        alert("The key entered is " + key.length + " hex digits (" + key.length * 4 + " bits)!\n\n" + " The length of the key must be 256 bits (64 hex digits)!\n\nPlease re-enter the key!");
        document.getElementById("encryptedValue").innerHTML = "size of key error";
        return false;
    }


    function encryption(text, key) {
        // Convert hex to bytes
        //   using aesjs.utils.hex.toBytes (function in the aes library)
        text = aesjs.utils.hex.toBytes(text);
        key = aesjs.utils.hex.toBytes(key);

        // AES_EBC encryption
        //    functions in the aes libraray
        //        can only accept key as Bytes
        var aesECB = new aesjs.ModeOfOperation.ecb(key);
        //        can only accept plaintext as bytes
        //        return result is also in bytes
        var encryptedInBytes = aesECB.encrypt(text);

        // convert encrypted_in_bytes back to hex
        //      using aesjs.utils.hex.fromBytes (function in the aes library)
        var cipherText = aesjs.utils.hex.fromBytes(encryptedInBytes);

        // return a HEX ciphertext
        return cipherText;
    }

    // compute encryption result by using our api
    var cipherText1 = encryption(plaintext, key);
    // print ciphertext on page
    document.getElementById("encryptedValue").innerHTML = cipherText1;
}

function decryptButton() {
    // get user input ciphertext as hex string
    var ciphertext = document.getElementById("cipherText").value;

    // get user entered key
    var key = document.getElementById('sameKey').value;
    // check length of key
    //          p.g. 1 byte = 2 hex digit
    //               key.length must be 64 hex digits = 256 bits
    if (key.length != 64) {
        alert("Your entered key is " + key.length + " hex digits (" + key.length * 4 + " bits)!\n\n" + " The length of key must be 256 bits (64 hex digits)!\n\nPlease re-enter the key!");
        document.getElementById("decryptedValue").innerHTML = "size of key error";
        return false;
    }

    function decryption(cipherText, key) {
        // Convert hex to bytes
        //   using aesjs.utils.hex.toBytes (function in the aes library)
        cipherText = aesjs.utils.hex.toBytes(cipherText);
        key = aesjs.utils.hex.toBytes(key);

        // AES_CBC encryption
        //    functions in the aes libraray
        //        can only accept key as Bytes
        var AES_ECB = new aesjs.ModeOfOperation.ecb(key);
        //        can only accept plaintext as bytes
        //        return result is also in bytes
        var decrypted_in_bytes = AES_ECB.decrypt(cipherText);

        // convert encrypted_in_bytes back to hex
        //      using aesjs.utils.hex.fromBytes (function in the aes library)
        var text = aesjs.utils.hex.fromBytes(decrypted_in_bytes);

        // return a HEX plaintext
        return text;
    }

    // compute decryption result by using our api
    var decryptedResult = decryption(ciphertext, key)
    // print encrypted result on the page
    document.getElementById("decryptedValue").innerHTML = decryptedResult;
}