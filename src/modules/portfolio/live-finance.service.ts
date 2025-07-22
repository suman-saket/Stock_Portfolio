import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class LiveFinanceService {
  // Basic mapping for demonstration. Expand as needed.
  private static stockNameToTicker: Record<string, { ticker: string; exchange: string }> = {
    'Reliance Industries Ltd': { ticker: 'RELIANCE', exchange: 'NSE' },
    'HDFC Bank Ltd': { ticker: 'HDFCBANK', exchange: 'NSE' },
    'Infosys Ltd': { ticker: 'INFY', exchange: 'NSE' },
    'Tata Consultancy Services Ltd': { ticker: 'TCS', exchange: 'NSE' },
    'ICICI Bank Ltd': { ticker: 'ICICIBANK', exchange: 'NSE' },
    'Bharti Airtel Ltd': { ticker: 'BHARTIARTL', exchange: 'NSE' },
    'State Bank of India': { ticker: 'SBIN', exchange: 'NSE' },
    'Kotak Mahindra Bank Ltd': { ticker: 'KOTAKBANK', exchange: 'NSE' },
    'Larsen & Toubro Ltd': { ticker: 'LT', exchange: 'NSE' },
    'Hindustan Unilever Ltd': { ticker: 'HINDUNILVR', exchange: 'NSE' },
    'ITC Ltd': { ticker: 'ITC', exchange: 'NSE' },
    'Axis Bank Ltd': { ticker: 'AXISBANK', exchange: 'NSE' },
    'Bajaj Finance Ltd': { ticker: 'BAJFINANCE', exchange: 'NSE' },
    'Maruti Suzuki India Ltd': { ticker: 'MARUTI', exchange: 'NSE' },
    'Sun Pharmaceutical Industries Ltd': { ticker: 'SUNPHARMA', exchange: 'NSE' },
    'HCL Technologies Ltd': { ticker: 'HCLTECH', exchange: 'NSE' },
    'UltraTech Cement Ltd': { ticker: 'ULTRACEMCO', exchange: 'NSE' },
    'Asian Paints Ltd': { ticker: 'ASIANPAINT', exchange: 'NSE' },
    'Nestle India Ltd': { ticker: 'NESTLEIND', exchange: 'NSE' },
    'Tata Motors Ltd': { ticker: 'TATAMOTORS', exchange: 'NSE' },
  };

  getTicker(stockName: string, exchangeCode: string): { ticker: string; exchange: string } {
    // Try mapping by name, fallback to exchangeCode
    return LiveFinanceService.stockNameToTicker[stockName] || { ticker: stockName, exchange: exchangeCode };
  }

  async getLiveData(tickerObj: { ticker: string; exchange: string }): Promise<{ cmp: number; peRatio: string; earnings: string }> {
    // Yahoo Finance: Get CMP (Indian stocks use .NS for NSE, .BO for BSE)
    let yfTicker = tickerObj.ticker;
    if (tickerObj.exchange === 'NSE') yfTicker += '.NS';
    if (tickerObj.exchange === 'BSE') yfTicker += '.BO';
    const quote = await yahooFinance.quote(yfTicker);
    const cmp = quote.regularMarketPrice ?? 0;

    // Google Finance: Scrape for P/E and Earnings
    const url = `https://www.google.com/finance/quote/${tickerObj.ticker}:${tickerObj.exchange}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // More precise selectors for Indian stocks (may need adjustment)
    let peRatio = 'N/A';
    let earnings = 'N/A';
    $('div[data-attrid]').each((_, el) => {
      const label = $(el).text();
      if (label.includes('P/E ratio')) {
        peRatio = $(el).next().text() || 'N/A';
      }
      if (label.includes('Earnings')) {
        earnings = $(el).next().text() || 'N/A';
      }
    });

    // Fallback: try to find numeric values in the page if selectors fail
    if (peRatio === 'N/A') {
      const peMatch = data.match(/P\/E ratio.*?(\d+\.\d+)/);
      if (peMatch) peRatio = peMatch[1];
    }
    if (earnings === 'N/A') {
      const earnMatch = data.match(/Earnings.*?(\d+\.\d+)/);
      if (earnMatch) earnings = earnMatch[1];
    }

    return { cmp, peRatio, earnings };
  }
}
