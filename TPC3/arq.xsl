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
                <body>
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
    
    <xsl:template match="ARQELEM" mode="conteudo">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Nome:</b> <xsl:apply-templates select="IDENTI"/> </p>
                    <p><b>Descrição:</b> <xsl:apply-templates select="DESCRI"/> </p>
                    <p><b>Local:</b>
                        <div style="margin: 20px" >
                        Lugar: <xsl:apply-templates select="LUGAR" /><br/> 
                        Freguesia: <xsl:apply-templates select="FREGUE" /><br/> 
                        Concelho: <xsl:apply-templates select="CONCEL" /><br/> 
                        Latitude: <xsl:apply-templates select="LATITU" /><br/> 
                        Longitude: <xsl:apply-templates select="LONGIT" /><br/>
                        Altitude: <xsl:apply-templates select="ALTITU" /><br/> 
                        </div>
                    </p>
                    
                    <p><b>Cronografia:</b> <xsl:apply-templates select="CRONO"/> </p>
                    <p><b>Acessos:</b> <xsl:apply-templates select="ACESSO"/> </p>
                    <p><b>Quadro:</b> <xsl:apply-templates select="QUADRO"/> </p>
                    <p><b>Descrição arqueológica:</b> <xsl:apply-templates select="DESARQ"/> </p>
                    <p><b>Trabalhos arqueológicos:</b> <xsl:apply-templates select="TRAARQ"/> </p>
                    <p><b>Interpretação:</b> <xsl:apply-templates select="INTERP"/> </p>
                    <p><b>Depósitos:</b> <xsl:apply-templates select="DEPOSI"/> </p>
                    <p><b>Bibliografia:</b> <ul><xsl:apply-templates select=".//BIBLIO"/></ul> </p>
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar á HOME</a>]
                    </address>
                    <center>
                        <hr width="90%"></hr>
                    </center>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    <xsl:template match="LIGA" mode="#all" >
        <xsl:variable name="linkName" select="."/>
        <a href="https://pt.wikipedia.org/wiki/{$linkName}" > <xsl:value-of select="."/> </a>
    </xsl:template>
    <xsl:template match="BIBLIO" mode="#all">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    
</xsl:stylesheet>