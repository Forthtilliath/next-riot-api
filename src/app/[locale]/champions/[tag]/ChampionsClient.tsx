'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import LinkToChampion from '@/features/champions/LinkToChampion';
import SwitchTags from '@/features/champions/SwitchTags';
import MainLayout from '@/features/layout/MainLayout';

import { useRouter } from '@/i18n/navigation';
import { CHAMPION_TAGS } from '@/utils/constantes';
import { capitalize } from '@/utils/methods/string';

import styles from '@/styles/Champions.module.scss';

type ChampionListItem = Pick<Champion, 'key' | 'id' | 'name' | 'tags' | 'version'>;

type Props = {
  champions: ChampionListItem[];
  initialTag: string;
  hasError: boolean;
};

function isChampionTag(tag: string): tag is UnionTags {
  return (CHAMPION_TAGS as readonly string[]).includes(tag);
}

export default function ChampionsClient({ champions, initialTag, hasError }: Props) {
  const capitalizedInitialTag = capitalize(initialTag);
  const [tag, setTagState] = useState<UnionTags | 'All'>(
    isChampionTag(capitalizedInitialTag) ? capitalizedInitialTag : 'All',
  );
  const t = useTranslations('champions');
  const tCommon = useTranslations('common');
  const router = useRouter();

  const setTag: TSetter<UnionTags | 'All'> = (newTag) => {
    setTagState(newTag);
    router.replace(`/champions/${(newTag as string).toLowerCase()}`, { scroll: false });
  };

  const championsFiltered = champions.filter((champ) => champ.tags.includes(tag) || tag === 'All');

  return (
    <MainLayout>
      <h1>{t('title')}</h1>
      {hasError ? (
        <h2>{tCommon('errors.fetch-champions')}</h2>
      ) : (
        <>
          <SwitchTags setTag={setTag} tag={tag} />
          <div className={styles.championsWrapper}>
            {championsFiltered.map(({ key, id, name, version }) => (
              <LinkToChampion key={key} id={id} name={name} version={version} styles={styles} />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  );
}
