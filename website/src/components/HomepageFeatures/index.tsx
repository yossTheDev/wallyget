import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<'svg'>>;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'Easy to Use',
		Svg: require('@site/static/img/console.svg').default,
		description: <>Easy to use commands for everyone</>,
	},
	{
		title: 'Different Wallpapers Sources',
		Svg: require('@site/static/img/undraw_monitor_iqpq.svg').default,
		description: (
			<>
				Customize your desktop with different wallpaper sources: Wallpaper
				Abyss, Bing and NASA image gallery. More coming soon...
			</>
		),
	},
	{
		title: 'Your Desktop',
		Svg: require('@site/static/img/undraw_online_wishes_dlmr.svg').default,
		description: <>Your Wallpapers!</>,
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg
					style={{ height: '150px' }}
					className={styles.featureSvg}
					role="img"
				/>
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
