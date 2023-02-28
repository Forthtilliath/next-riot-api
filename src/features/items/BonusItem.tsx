import React from 'react';

type Props = {
  key: keyof Item['stats'];
  value: ObjectValues<Item['stats']>;
};

export default function BonusItem({ key, value }: Props) {
  return <div>BonusItem</div>;
}
