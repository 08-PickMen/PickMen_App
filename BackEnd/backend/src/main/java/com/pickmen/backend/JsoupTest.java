package com.pickmen.backend;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class JsoupTest {

    public static void getStockPriceList() {
      final String stockList = "https://namu.wiki/w/%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90/%ED%95%99%EB%B6%80";
      Connection conn = Jsoup.connect(stockList);
  
      try {
        Document document = conn.get();
        String thead = getStockHeader(document); // 칼럼명
        String tbody = getStockList(document);   // 데이터 리스트
        System.out.println(thead);
        System.out.println(tbody);
  
      } catch (IOException ignored) {
      }
    }
  
    public static String getStockHeader(Document document) {
      Elements stockTableBody = document.select("table.pjOoC8wo tbody tr");
      StringBuilder sb = new StringBuilder();
      for (Element element : stockTableBody) {
        for (Element td : element.select("td")) {
          sb.append(td.text());
          sb.append("   ");
        }
        break;
      }
      return sb.toString();
    }
  
    public static String getStockList(Document document) {
      Elements stockTableBody = document.select("table.type_2 tbody tr");
      StringBuilder sb = new StringBuilder();
      for (Element element : stockTableBody) {
        if (element.attr("onmouseover").isEmpty()) {
          continue;
        }
  
        for (Element td : element.select("td")) {
          String text;
          if(td.select(".center a").attr("href").isEmpty()){
            text = td.text();
          }else{
            text = "https://finance.naver.com"+td.select(".center a").attr("href");
          }
          sb.append(text);
          sb.append("   ");
        }
        sb.append(System.getProperty("line.separator")); //줄바꿈
      }
      return sb.toString();
    }
  
    public static void main(String[] args) {
      getStockPriceList();
    }
  }
