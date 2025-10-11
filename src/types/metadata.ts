import type { Metadata } from "next";
import type { Locale } from "./i18n";

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  siteName: string;
  twitterHandle?: string;
  ogImage?: string;
}

export interface LocalizedMetadata {
  locale: Locale;
  title: string;
  description: string;
  keywords?: string[];
}

export type MetadataGenerator = (locale: Locale) => Metadata;
