import { useTranslation } from 'next-i18next';

import { MAPS, mapCssUrl } from '@/utils/constantes';

import RadioGroup from '../RadioGroup';

import styles from '@/styles/Items.module.scss';

type Props = {
  setMap: TSetter<ObjectValues<typeof MAPS>>;
  version: string;
};

export default function SwitchMap({ setMap, version }: Props) {
  const { t } = useTranslation('');
  const cssUrl = mapCssUrl(version);

  return (
    <RadioGroup callback={setMap}>
      <span
        className={styles.mapImage}
        style={cssUrl.SUMMONER_RIFT}
        data-name={t('items:maps:' + MAPS.SUMMONER_RIFT)}>
        {MAPS.SUMMONER_RIFT}
      </span>
      <span
        className={styles.mapImage}
        style={cssUrl.HOWLING_ABYSS}
        data-name={t('items:maps:' + MAPS.HOWLING_ABYSS)}>
        {MAPS.HOWLING_ABYSS}
      </span>
    </RadioGroup>
  );
}
