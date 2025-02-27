<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Part 3 Gorbach</title>
                <style>
                    body {
                        font-family: 'Verdana', sans-serif;
                        font-weight: 400;
                        font-size: 18px;
                        text-align: center;
                        background-image: linear-gradient(
                            90deg,
                            rgba(92, 58, 180, 1) 0%,
                            rgba(131, 58, 180, 1) 29%,
                            rgba(180, 58, 175, 1) 58%,
                            rgba(252, 176, 69, 1) 88%,
                            rgba(252, 225, 69, 1) 100%
                        );
                        padding: 50px 20px;
                    }
                    h1{
                        color: white;
                    }
                    table {
                        margin: auto;
                        border-collapse: collapse;
                        background-color: #f1e5ff;
                        max-width: 800px;
                    }
                    th, td {
                        border: 1px solid rgb(53 32 106);
                        padding: 10px;
                    }
                    th {
                        background-color: #7935cb;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #e3ccff;
                    }
                </style>
            </head>
            <body>
                <h1>Фізичні дані осіб</h1>
                <table>
                    <tr>
                        <th>Ім'я</th>
                        <th>Стать</th>
                        <th>Вік</th>
                        <th>Ріст</th>
                        <th>Вага</th>
                        <th>ІМТ</th>
                        <th>Група крові</th>
                    </tr>
                    <xsl:apply-templates select="physical_data/person"/>
                </table>
            </body>

            <!-- Script for XPath output to the browser console -->
            <script src="script-for-part-2.js"></script>
        </html>
    </xsl:template>

    <xsl:template match="person">
        <tr>
            <td><xsl:value-of select="fullname"/></td>
            <td><xsl:value-of select="gender"/></td>
            <td><xsl:value-of select="age"/></td>
            <td><xsl:value-of select="height"/> <xsl:value-of select="height/@unit"/></td>
            <td><xsl:value-of select="weight"/> <xsl:value-of select="weight/@unit"/></td>
            <td><xsl:value-of select="BMI"/></td>
            <td><xsl:value-of select="blood_type"/></td>
        </tr>
    </xsl:template>

</xsl:stylesheet>