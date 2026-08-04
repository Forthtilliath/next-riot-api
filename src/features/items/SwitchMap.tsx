'use client';

import { useTranslations } from 'next-intl';

import { MAPS, mapCssUrl } from '@/utils/constantes';

import RadioGroup from '../RadioGroup';

import styles from '@/styles/Items.module.scss';

type Props = {
  setMap: TSetter<ObjectValues<typeof MAPS>>;
  version: string;
};

export default function SwitchMap({ setMap, version }: Props) {
  const t = useTranslations('items');
  const cssUrl = mapCssUrl(version);

  return (
    <RadioGroup callback={setMap}>
      <span
        className={styles.mapImage}
        style={cssUrl.SUMMONER_RIFT}
        data-name={t('maps.' + MAPS.SUMMONER_RIFT)}>
        {MAPS.SUMMONER_RIFT}
      </span>
      <span
        className={styles.mapImage}
        style={cssUrl.HOWLING_ABYSS}
        data-name={t('maps.' + MAPS.HOWLING_ABYSS)}>
        {MAPS.HOWLING_ABYSS}
      </span>
    </RadioGroup>
  );
}
