<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:template match="/">
        <xsl:result-document href="site/index.html"> 
            <html>
                <head>
                    <title>Arquivo de Arqueossitios</title>
                    
                </head>
                <body style="font-family: arial,sans-serif;">
                    <h2>Arquivo de Arqueossitios</h2>
                    <h3>Indice</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>                    
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="conteudo"/>
        
        
        
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">                
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
   
    <!-- Universal Templates  -->
    
    
    <xsl:template match="LIGA" mode="#all" >
        <a href="https://pt.wikipedia.org/wiki/{.[@TERMO]}" > <xsl:value-of select="."/> </a>
    </xsl:template>
    <!-- Content -->
    
    <xsl:template match="ARQELEM" mode="conteudo">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body  style="font-family: arial,sans-serif;">
                    <p><b>Nome:</b> <xsl:apply-templates select="IDENTI"/> </p>
                    <p><b>Descrição:</b> <xsl:apply-templates select="DESCRI"/> </p>
                    <xsl:apply-templates select="TIPO" mode="conteudo"/>
                    <xsl:apply-templates select="IMAGEM" mode="conteudo"/>
                    <xsl:apply-templates select="CRONO" mode="conteudo"/>
                    <p><b>Local:</b>
                        <div style="margin: 20px" >
                            <b>Lugar</b>: <xsl:apply-templates select="LUGAR" mode="conteudo" /><br/> 
                            <b>Freguesia</b>: <xsl:apply-templates select="FREGUE" mode="conteudo" /><br/> 
                            <b>Concelho</b>: <xsl:apply-templates select="CONCEL" mode="conteudo" /><br/>
                            <xsl:apply-templates select="LATITU" mode="conteudo"/>
                            <xsl:apply-templates select="LONGIT" mode="conteudo"/>
                            <xsl:apply-templates select="ALTITU" mode="conteudo"/>
                        </div>
                    </p>
                    <xsl:apply-templates select="ACESSO" mode="conteudo"/>
                    <xsl:apply-templates select="QUADRO" mode="conteudo"/>
                    <xsl:apply-templates select="DEPOSI" mode="conteudo"/>
                    
                    <xsl:apply-templates select="INTERP" mode="conteudo"/>
                    
                    <xsl:apply-templates select="INTERE" mode="conteudo" />
                    
                    <xsl:apply-templates select="DESARQ" mode="conteudo"/>
                    
                    <xsl:apply-templates select="TRAARQ" mode="conteudo"/>
                    <p><b>Bibliografia:</b> <ul><xsl:apply-templates select=".//BIBLIO"/></ul> </p>
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar á HOME</a>]
                    </address>
                    <center>
                        <hr width="90%"></hr>
                    </center>
                    <footer>
                        <xsl:apply-templates select="AUTOR" mode="conteudo"/>
                    </footer>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    <xsl:template match="BIBLIO" mode="conteudo" >
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    <xsl:template match="IMAGEM" mode="conteudo" >  
    <img src="{@NOME}" alt="https://img.favpng.com/18/9/15/computer-icons-archaeology-logo-font-png-favpng-huHVAV0XivXyFjQXTi3xRkKs8.jpg" /> <br/>
        
    </xsl:template>
    <xsl:template match="DESCRI" mode="conteudo" >
        <b>Descrição</b>:<xsl:apply-templates mode="conteudo"/><br/>
    </xsl:template>
    <xsl:template match="CRONO" mode="conteudo" >
        <b>Cronologia</b>:<xsl:apply-templates mode="conteudo"/><br/>
    </xsl:template>
    <xsl:template match="LATITU" mode="conteudo" >
        <b>Latitude</b>:<xsl:apply-templates mode="conteudo"/><br/>
    </xsl:template>
    <xsl:template match="LONGIT" mode="conteudo" >
        <b>Longitude</b>:<xsl:apply-templates mode="conteudo"/><br/>
    </xsl:template>
    <xsl:template match="ALTITU" mode="conteudo" >
        <b>Altitude</b>:<xsl:apply-templates mode="conteudo"/><br/>
    </xsl:template>
    <xsl:template match="ACESSO" mode="conteudo" >
        <p>
        <b>Acessos</b>:<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="QUADRO" mode="conteudo" >
        <p>
            <b>Quadro</b>:<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="AUTOR" mode="conteudo" >
        <p>
            <b><xsl:apply-templates mode="conteudo"/> :</b> <xsl:apply-templates select="../DATA" mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="DEPOSI" mode="conteudo" >
        <p>
            <b>Depósito</b>:<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="DESARQ" mode="conteudo" >
        <p>
            <b>Descrição arqueológica</b>:<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="TRAARQ" mode="conteudo" >
        <p>
            <b>Trabalhos de arqueologia</b>:<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
    <xsl:template match="INTERE" mode="conteudo" >
<p>
<b>Interpretação Subjetiva</b>:<xsl:apply-templates mode="conteudo"/></p>
    </xsl:template>
    <xsl:template match="INTERP" mode="conteudo" >
        <p>
            <b>Interpretação
                Objetiva</b> :<xsl:apply-templates mode="conteudo"/>
        </p>
    </xsl:template>
</xsl:stylesheet>