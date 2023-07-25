// ==UserScript==
// @name         CaptPix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://pixandprofit.com/*
// @require     file://D:\tamper\testUrl.js
// @grant    GM.setValue
// @grant    GM.getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
	var UrlRfrr = "";
   // var cookieRequest = "";
	var count = 0;
    var countTimeReload = 0;
	var myInterval = setInterval(myReloadCapt, 1000);
    const myCheckLoadPage = setInterval(LoadedInterval, 1000);
	const xmlHttp = new XMLHttpRequest();
	const _email = "#email";
	const _password = "#password";

    setTimeout(function(){
		if(document.querySelector("#do_login")){
			GM.getValue("email").then(value=>{
				if(value != null) document.querySelector("#email").value = value;
			});
			document.querySelector("#password").value = "tinvan";

			var _buttonEmail = document.createElement("button");
			_buttonEmail.innerHTML = "\n<b>Set this email to login</b>";
			_buttonEmail.setAttribute("class","p_nomargin");
			_buttonEmail.onclick = function(){
				GM.setValue("email", document.querySelector("#email").value);
				window.location = window.location;
				};
			document.querySelectorAll("p")[1].appendChild(_buttonEmail);
			GM.deleteValue("srcIfram");

        }
	},2000);
	function myReloadCapt(){
		if(window.location.href == "http://pixandprofit.com/" && document.cookie == "" && UrlRfrr != ""){
				window.location.href = UrlRfrr;
		}
		if(document.querySelector("iframe") && document.querySelector("iframe").src.includes("twitter") == true){GM.deleteValue("srcIfram");}
		if(document.querySelector("#do_login")){
			if(document.querySelector("input[name='keystring']").value != "" && document.querySelector("#email").value != "" && window.location.href.includes("?rfrr=")) {
				document.querySelector("#do_login").click();
				if(document.querySelector("#email").value != ""){
					GM.getValue("email").then(value=>{
						if(value == null) GM.setValue("email", document.querySelector("#email").value);
					});
				}
			}else{
				if(window.location.href == "http://pixandprofit.com/"){
					document.querySelector("input[name='keystring']").setAttribute("style","display:none");
					countTimeReload = countTimeReload + 1;
					if(!document.querySelector("span")){
						document.querySelectorAll("p")[1].appendChild(document.createElement("span")).textContent = "\t"+countTimeReload;
					}
					else{
						document.querySelector("span").textContent = "\t"+countTimeReload;
					}
					if(countTimeReload > 30){
						window.location = window.location;
					}
				}
			}
        }
		else clearInterval(myInterval);
    }
	setTimeout(function(){
		if(document.querySelector("iframe") && document.querySelector("iframe").src.includes("twitter") == false)
		{
			if(document.querySelector("iframe").contentWindow.document.querySelectorAll(".general_text")[2].textContent == "\n\t\t\t\tNo pictures ready, please wait\t\t\t\t\n\t\t\t\t\n\t\t\t") {
				GM.setValue("srcIfram",document.querySelector("iframe").src);

				window.frames[0].stop();
				document.querySelectorAll(".button_link")[1].click();
			}

        }
		if(window.location.href == "http://pixandprofit.com/" && document.cookie != "")
		{
			document.cookie = document.cookie +'; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		if(!document.querySelector("strong") && window.location.href == "http://pixandprofit.com/mainframe/"){
			GM.getValue("Loading").then(value=>{

				if(value == false) window.location.href = "http://pixandprofit.com";
			});
		}
		if(document.querySelector(".caption")){
			if(window.location.href.includes("?rfrr=") && document.querySelector(".caption").textContent == "Statistics." || document.querySelector(".caption").textContent == "Preferences.")
			{
				GM.getValue("srcIfram").then(value=>
				{
					if(value && value != ""){
						window.location = "http://pixandprofit.com/mainframe/";
					}
					else{
						document.querySelectorAll(".button_link")[0].click();
					}
				});
			}
		}
	},2000);

	if(document.querySelectorAll(".general_text")[2]){
		if(document.querySelectorAll(".general_text")[2].textContent == "\n\t\t\t\tNo pictures ready, please wait\t\t\t\t\n\t\t\t\t\n\t\t\t") {
			var _button = document.createElement("button");
			_button.innerHTML = "<b>Reset All</b>";
			_button.onclick = function(){GM.deleteValue("myBalance");GM.deleteValue("Loading");};
			document.querySelectorAll("td")[4].appendChild(_button);
			GM.getValue("myBalance").then(value=>{
				var textBalance = document.querySelectorAll(".general_text")[1].textContent.split(" ")[0].split(":")[0].trim(); //'Pictures' or 'Balance'
				var _Balance = document.querySelectorAll(".general_text")[1].textContent.split(" ")[0].split(":")[1].trim();
				if(value == null) GM.setValue("myBalance", _Balance);
				if(textBalance == "Balance") document.querySelectorAll(".general_text")[1].appendChild(document.createElement("div")).innerHTML = "<br>Today: <b>" + (getBalance()-(value*1000))/1000;
				else document.querySelectorAll(".general_text")[1].appendChild(document.createElement("div")).innerHTML = "<br>Member in group<b>"
			});
			var _buttonLoading = document.createElement("button");

			GM.getValue("Loading").then(value=>{
				if(value == null)
				{
					GM.setValue("Loading",false);
				}
				if(value == false) _buttonLoading.innerHTML = "<b>Will logout when end session!</b>";
				else _buttonLoading.innerHTML = "<b>Continue work!</b>";


			});
            _buttonLoading.onclick = function(){
				if(document.querySelectorAll("button")[1].textContent == "Will logout when end session!") GM.setValue("Loading",true);
				else GM.setValue("Loading",false);
			};
           document.querySelectorAll("td")[4].appendChild(_buttonLoading);

		}
	}
    function LoadedInterval(){
		if(document.querySelector("#value")){
			count = count + 1;
			if(count > 15) window.location = "http://pixandprofit.com/mainframe/";
			else
			{
				if(document.querySelector("img").alt == "picture is loading") document.querySelector("#value").value = "picture is loading";
				if(document.querySelector("#value").value != ""){
					document.querySelector("#send").click();
						count = 0;

				}
			}
		}
		else{clearInterval(myCheckLoadPage);}
    }
	function getBalance(){
		let balanceArray = document.querySelectorAll(".general_text")[1].textContent.split(" ")[0].split(":")[1].trim();
		return balanceArray*1000;
	}
    function qSelectorAll(selector) {
        return document.querySelectorAll(selector);
    }

    function qSelector(selector) {
        return document.querySelector(selector);
    }
})();