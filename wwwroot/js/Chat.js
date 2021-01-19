"use strict"

import { signalR } from "./signalr.js";

// Create new connection
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the button until connection is established
$("#BtnSend").attr("disabled", true);


// On message received add message to list box
connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt").replace(/>/g, "&gt;");
    var encodeMsg = user + ": " + msg;
    $("#MessageList").prepend("<li>" + encodeMsg + "</li>");
});

// On connection established
connection.start().then(function () {
    $("#BtnSend").attr("disabled", false);
}).catch(function (err) {
    alert("Failed to connect: " + err.toString());
});

// On click event
$("#BtnSend").on("click", function () {
    var user = $("TxtUserName").val();
    var msg = $("TxtUserName").val();

    if (user != "" && msg != "") {
        connection.invoke("SendMessage", user, message).catch(function () {
            return alert("Failed to send: " + err.toString());
        });
    }
});