import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { CSS_URL, MAPS } from '@/utils/constantes';

import RadioGroup from '../RadioGroup';

import styles from '@/styles/Items.module.scss';

type Props = {
  setMap: TSetter<ObjectValues<typeof MAPS>>;
};

export default function SwitchMap({ setMap }: Props) {
  const { t } = useTranslation('');

  return (
    <RadioGroup callback={setMap}>
      <span
        className={styles.mapImage}
        style={CSS_URL.SUMMONER_RIFT}
        data-name={t('items:maps:' + MAPS.SUMMONER_RIFT)}>
        {MAPS.SUMMONER_RIFT}
      </span>
      <span
        className={styles.mapImage}
        style={CSS_URL.HOWLING_ABYSS}
        data-name={t('items:maps:' + MAPS.HOWLING_ABYSS)}>
        {MAPS.HOWLING_ABYSS}
      </span>
    </RadioGroup>
  );
}
