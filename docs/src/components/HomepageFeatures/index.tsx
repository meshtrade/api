import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  imageSrc?: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Multi-Language SDKs',
    imageSrc: require('@site/static/img/multilingual_support.png').default,
    description: (
      <>
        Native SDKs for Go, Python, Java and Typescript. Handle authentication, retries, and type safety automatically.
      </>
    ),
  },
  {
    title: 'Ready for Production',
    imageSrc: require('@site/static/img/schema-driven-design.png').default,
    description: (
      <>
        Role-based access control, audit logging, and compliance tools included.
        Build regulated financial services with confidence.
      </>
    ),
  },
  {
    title: 'Financial Trading Platform',
    imageSrc: require('@site/static/img/cube.png').default,
    description: (
      <>
        Everything you need: trading, order management, wallets, compliance, and identity management in one integrated API.
      </>
    ),
  },
];

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {FeatureList.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <div className={styles.imageSection}>
                {feature.Svg && <feature.Svg className={styles.featureSvg} role="img" />}
                {feature.imageSrc && <img src={feature.imageSrc} className={styles.featureImg} alt={feature.title} />}
              </div>
              <div className={styles.titleSection}>
                <h3>{feature.title}</h3>
              </div>
              <div className={styles.descriptionSection}>
                <p className="padding-horiz--md">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
