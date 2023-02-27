import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { MAPS } from '@/utils/constantes';

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
        className={classNames(styles.mapImage, styles.mapSummonerRift)}
        data-name={t('items:maps:' + MAPS.SUMMONER_RIFT)}>
        {MAPS.SUMMONER_RIFT}
      </span>
      <span
        className={classNames(styles.mapImage, styles.mapHowlingAbyss)}
        data-name={t('items:maps:' + MAPS.HOWLING_ABYSS)}>
        {MAPS.HOWLING_ABYSS}
      </span>
    </RadioGroup>
  );
}
