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
        Official SDKs for Go, Python, and TypeScript generated from the same
        protobuf definitions. Type-safe, consistent APIs across all languages.
      </>
    ),
  },
  {
    title: 'gRPC Native',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        High-performance gRPC protocol with schema-first development and strong typing.
      </>
    ),
  },
];

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {/* Image Row */}
          {FeatureList.map((feature, idx) => (
            <div key={`image-${idx}`} className={styles.imageSection}>
              {feature.Svg && <feature.Svg className={styles.featureSvg} role="img" />}
              {feature.imageSrc && <img src={feature.imageSrc} className={styles.featureImg} alt={feature.title} />}
            </div>
          ))}
          
          {/* Title Row */}
          {FeatureList.map((feature, idx) => (
            <div key={`title-${idx}`} className={styles.titleSection}>
              <h3>{feature.title}</h3>
            </div>
          ))}
          
          {/* Description Row */}
          {FeatureList.map((feature, idx) => (
            <div key={`desc-${idx}`} className={styles.descriptionSection}>
              <p className="padding-horiz--md">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
