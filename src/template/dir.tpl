<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body {
      margin: 60px;
      font-size: 20px;
    }
    p {
      margin: 30px 0;
      font-size: 25px;
      color: #101010;
    }
    a {
      display: block;
      text-decoration: none;
      font-size: 20px;
      color: #444;
    }

  </style>
</head>
<body>
  <p>{{title}}</p>
{{#each files}}
  <a href="{{../dir}}/{{this}}">{{this}}</a>
{{/each}}
</body>
</html>