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
        Full-featured SDKs for Go and Python generated from protobuf definitions. 
        Both SDKs feature automatic authentication and client configuration.
      </>
    ),
  },
  {
    title: 'Schema-First Design',
    imageSrc: require('@site/static/img/schema-driven-design.png').default,
    description: (
      <>
        gRPC-based API with protobuf single source of truth. Domain-organized 
        services with comprehensive role-based access control.
      </>
    ),
  },
  {
    title: 'Financial Trading Platform',
    imageSrc: require('@site/static/img/cube.png').default,
    description: (
      <>
        IAM, trading, compliance, and wallet services for regulated financial operations.
        Starting with API User Service - more domains coming soon.
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
