<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
  version="2.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xforms="http://www.w3.org/2002/xforms"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xforms xhtml">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <!-- Копіюємо інші елементи -->
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>

  <!-- Видаляємо модель -->
  <xsl:template match="xforms:model"/>

  <!-- Перетворення xforms:select1 -->
  <xsl:template match="xforms:select1">
    <xsl:variable name="name" select="@ref"/>
    
    <xsl:choose>
      <!-- Стать та питання 1: обробляємо як radio -->
      <xsl:when test="@ref = 'gender' or @ref = 'pushups'">
        <label>
          <xsl:value-of select="preceding-sibling::xforms:label[1]"/>
        </label>
        <xsl:for-each select="xforms:item">
          <label>
            <input type="radio" name="{$name}" value="{xforms:value}"/>
            <xsl:value-of select="xforms:label"/>
          </label>
        </xsl:for-each>
      </xsl:when>

      <!-- Питання 3: select -->
      <xsl:when test="@ref = 'duration'">
        <label for="{$name}">
          <xsl:value-of select="preceding-sibling::xforms:label[1]"/>
        </label>
        <select name="{$name}" id="{$name}">
          <xsl:for-each select="xforms:item">
            <option value="{xforms:value}">
              <xsl:value-of select="xforms:label"/>
            </option>
          </xsl:for-each>
        </select>
      </xsl:when>

      <!-- Інші випадки: якщо треба -->
      <xsl:otherwise>
        <label>
          <xsl:value-of select="preceding-sibling::xforms:label[1]"/>
        </label>
        <xsl:for-each select="xforms:item">
          <label>
            <input type="radio" name="{$name}" value="{xforms:value}"/>
            <xsl:value-of select="xforms:label"/>
          </label>
        </xsl:for-each>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Чекбокси -->
  <xsl:template match="xforms:select">
    <xsl:variable name="name" select="@ref"/>
    <label>
      <xsl:value-of select="preceding-sibling::xforms:label[1]"/>
    </label>
    <xsl:for-each select="xforms:item">
      <label>
        <input type="checkbox" name="{$name}[]" value="{xforms:value}"/>
        <xsl:value-of select="xforms:label"/>
      </label>
    </xsl:for-each>
  </xsl:template>

  <!-- xforms:input -->
  <xsl:template match="xforms:input">
    <xsl:variable name="name" select="@ref"/>
    <xsl:choose>
      <xsl:when test="xforms:choices">
        <!-- datalist -->
        <label for="{$name}">
          <xsl:value-of select="xforms:label"/>
        </label>
        <input list="{$name}_list" name="{$name}" id="{$name}"/>
        <datalist id="{$name}_list">
          <xsl:for-each select="xforms:choices/xforms:item">
            <option value="{xforms:value}"/>
          </xsl:for-each>
        </datalist>
      </xsl:when>
      <xsl:otherwise>
        <!-- input number -->
        <label for="{$name}">
          <xsl:value-of select="xforms:label"/>
        </label>
        <input name="{$name}" id="{$name}" type="number"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Кнопка відправки -->
  <xsl:template match="xforms:submit">
    <input type="submit">
      <xsl:attribute name="value">
        <xsl:value-of select="xforms:label"/>
      </xsl:attribute>
    </input>
  </xsl:template>

</xsl:stylesheet>
