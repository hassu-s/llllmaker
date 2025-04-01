function generateRandomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function loadGoogleFont(fontName, callback) {
    const linkId = 'dynamic-google-font';
    let linkElement = document.getElementById(linkId);
    if (linkElement) {
        document.head.removeChild(linkElement);
    }
    linkElement = document.createElement('link');
    linkElement.id = linkId;
    linkElement.rel = 'stylesheet';
    linkElement.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;700&display=swap`;
    linkElement.onload = callback;
    document.head.appendChild(linkElement);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i];
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
            ctx.fillText(line, x, y);
            line = words[i];
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (line) {
        ctx.fillText(line, x, y);
    }
}

function updateCanvas() {
    const canvas = document.getElementById("card-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 3200;
    canvas.height = 1800;
    const backgroundImage = document.getElementById("background-image").value;
    const fontType = document.getElementById("font-type").value || "Noto Sans JP";
    const name = document.getElementById("circle-name").value;
    const id = document.getElementById("circle-id").value;
    const activityPolicy = document.getElementById("activity-policy").value;
    const joinPolicy = document.getElementById("join-policy").value;
    const description = document.getElementById("circle-description").value;
    const textColor = document.getElementById("color").value || "black"; // Fetch the color value
    const image = new Image();
    image.src = backgroundImage;
    image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = `bold 200px '${fontType}'`;
        ctx.fillStyle = textColor;

        ctx.textBaseline = "top";
        ctx.fillText("サクメン", 240, 170);

        ctx.font = `bold 150px '${fontType}'`;
        ctx.fillText("募集中！", 350, 410);

        ctx.font = `bold 80px '${fontType}'`;
        ctx.fillText("サークル名", 1400, 160);
        ctx.font = `80px '${fontType}'`;
        ctx.fillText(name, 1400, 270);
        ctx.font = `bold 80px '${fontType}'`;
        ctx.fillText("サークルID", 2200, 160);
        ctx.font = `80px '${fontType}'`;
        ctx.fillText(id, 2200, 270);
        ctx.font = `bold 80px '${fontType}'`;
        ctx.fillText("活動方針", 1400, 420);
        ctx.font = `80px '${fontType}'`;
        ctx.fillText(activityPolicy, 1400, 530);
        ctx.font = `bold 80px '${fontType}'`;
        ctx.fillText("加入方針", 2200, 420);
        ctx.font = `80px '${fontType}'`;
        ctx.fillText(joinPolicy, 2200, 530);
        ctx.font = `bold 80px '${fontType}'`;
        ctx.fillText("サークル紹介", 140, 680);
        ctx.font = `80px '${fontType}'`;
        const maxWidth = canvas.width - 280;
        const lineHeight = 80;
        wrapText(ctx, description, 140, 790, maxWidth, lineHeight);
        document.getElementById("download-card").disabled = false;
        document.getElementById("tweet-button").disabled = false;
    };
}

document.querySelectorAll("input, select, textarea").forEach(element => {
    element.addEventListener("input", updateCanvas);
});

document.getElementById("font-type").addEventListener("change", function () {
    const selectedFont = this.value;
    loadGoogleFont(selectedFont, updateCanvas);
});

document.getElementById("generate-card").addEventListener("click", function () {
    updateCanvas();
});

document.getElementById("download-card").addEventListener("click", function () {
    const canvas = document.getElementById("card-canvas");
    const randomFileName = `circle-card-${generateRandomString()}.png`;
    const link = document.createElement("a");
    link.download = randomFileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
});

document.getElementById("tweet-button").addEventListener("click", function () {
    const name = document.getElementById("circle-name").value;
    const id = document.getElementById("circle-id").value;
    const tweetText = encodeURIComponent(
        `リンクラサークル「${name}」はメンバーを募集しています！\n・サークル名：${name}\n・サークルID：${id}\n#リンクラサークル募集 #リンクラ #蓮ノ空`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
});

document.getElementById("color").addEventListener("input", function () {
    updateCanvas();
});
