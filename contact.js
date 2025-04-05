document.addEventListener("DOMContentLoaded", function () {
    const userAgent = navigator.userAgent;

    const os = (function () {
        if (navigator.userAgent.indexOf("Windows") !== -1) return "Windows";
        if (/Android/.test(navigator.userAgent)) return "Android";
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) return "iOS";
        if (navigator.userAgent.indexOf("Mac") !== -1) return "MacOS";
        if (navigator.userAgent.indexOf("Linux") !== -1) return "Linux";
        return "Unknown OS";
    })();

    const baseURL = "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAT0vBmNUM0pYSDdXUjU4VE5JT1ZGMDNHR0lMQTdGQy4u&r4384268a42b74a1b8adfe47002b7c0b2=%22%E3%83%AA%E3%83%B3%E3%82%AF%E3%83%A9%E3%83%A2%E3%83%BC%E3%83%89%22&r24dfb3c4d3e1448db40c3d3921a10169={useragent}";

    const updatedURL = baseURL.replace("{useragent}", encodeURIComponent(`${os} - ${userAgent}`));

    const iframe = document.querySelector(".ifs");
    if (iframe) {
        iframe.src = updatedURL;
    } else {
        console.error("iframeが見つかりませんでした！");
    }

    console.log("生成されたURL:", updatedURL);
});
