export default ({ title, message }) => `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="
    margin:0;
    background:#f5f5f5;
    font-family:Arial,sans-serif;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
">

<div style="
    background:#fff;
    max-width:500px;
    width:90%;
    padding:40px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 2px 12px rgba(0,0,0,.08);
">

    <h1 style="margin:0 0 20px;color:#16a34a;">
        ${title}
    </h1>

    <p style="margin:0;color:#555;line-height:1.7;">
        ${message}
    </p>

</div>

</body>
</html>
`;