import Image from 'next/image';
import Link from 'next/link';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import InfoBar from '@/features/champions/InfoBar';
import LinkToChampion from '@/features/champions/LinkToChampion';
import Slider from '@/features/champions/Slider';
import Error from '@/features/Error';
import MainLayout from '@/features/layout/MainLayout';

import { getChampion } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';

import styles from '@/styles/Champion.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Champion({ champion, error }: Props) {
  const { t } = useTranslation();

  if (error.hasError) {
    return <Error trans_key={error.key} />;
  }

  const { name, tags, title, blurb, info, skins, moreChampions } = champion as NonNullable<
    typeof champion
  >;

  return (
    <MainLayout title={name}>
      <div className={styles.coverWrapper}>
        <Image
          src={skins[0].centeredUrl}
          alt="cover"
          className={styles.cover}
          priority
          fill
        />
      </div>
      <h1>{name}</h1>
      <div className={styles.row}>
        <div className={styles.slider}>
          <div className={styles.sliderImage}>
            <Slider images={skins.map((skin) => skin.loadingUrl)} />
          </div>
        </div>
        <div className={styles.details}>
          <h2 className={styles.h2}>{title}</h2>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <Link key={tag} href={`/champions/${tag.toLowerCase()}`}>
                <span className={styles.tag} active="true">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className={styles.blurb}>{blurb}</p>
          <div className={styles.infos}>
            {Object.entries(info).map(([key, value]) => (
              <InfoBar key={key} label={key} value={value} type={key as UnionInfos} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.moreChampions}>
        <h2>{t('champions:more-champions')}</h2>
        <div className={styles.championsWrapper}>
          {moreChampions.map(({ key, id, name, version }) => (
            <LinkToChampion key={key} id={id} name={name} version={version} styles={styles} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({
  locale = DEFAULT_LOCALE,
  params,
}: GetServerSidePropsContext) {
  const champion = (await getChampion(locale, params?.name as string)) as ChampionDetails | null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
      champion,
      error: {
        hasError: !champion,
        key: 'common:errors:fetch-champion',
      } as TError,
    },
  };
}
