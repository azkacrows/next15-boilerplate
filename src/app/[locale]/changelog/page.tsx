import { getTranslations } from 'next-intl/server';
import { type Locale, locales } from '@/types/i18n';
import { generatePageMetadata } from '@/shared/constants/metadata';
import Link from 'next/link';
import { readFile } from 'fs/promises';
import { join } from 'path';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'changelogPage' });

  return generatePageMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  });
}

async function getChangelogContent(): Promise<string> {
  try {
    const changelogPath = join(process.cwd(), 'CHANGELOG.md');
    const content = await readFile(changelogPath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading CHANGELOG.md:', error);
    return '# Changelog\n\nChangelog content not available.';
  }
}

export default async function ChangelogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'changelogPage' });
  const changelogContent = await getChangelogContent();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-6 min-h-[88px]">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← {t('backToHome')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-p:my-4 prose-ul:my-4 prose-li:my-2 prose-strong:font-semibold prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border">
          <ChangelogMarkdown content={changelogContent} />
        </article>
      </main>

      <footer className="border-t border-border py-8 min-h-[120px]">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-muted-foreground/80">{t('footer.madeWith')}</p>
        </div>
      </footer>
    </div>
  );
}

function ChangelogMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      const ListTag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(
        <ListTag key={`list-${key++}`} className="my-4">
          {currentList.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl font-bold mt-8 mb-4">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-4">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-bold mt-8 mb-3">
          {line.substring(4)}
        </h3>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.substring(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.trim() === '---') {
      flushList();
      elements.push(<hr key={`hr-${index}`} className="my-8 border-border" />);
    } else if (line.trim()) {
      flushList();
      if (!line.startsWith('[') || !line.includes('](#')) {
        elements.push(
          <p
            key={`p-${index}`}
            className="my-4"
            dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line) }}
          />
        );
      }
    } else {
      flushList();
    }
  });

  flushList();

  return <>{elements}</>;
}

function parseInlineMarkdown(text: string): string {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return text;
}
