import ContentLoader from "react-content-loader";

export const Skeleton = () => {
  return (
    <ContentLoader
      speed={1}
      width={210}
      height={80}
      viewBox="0 0 210 73"
      backgroundColor="#f7f7f7"
      foregroundColor="#e1e1e1"
    >
      <circle cx="36" cy="36" r="36" />
      <rect x="87" y="47" rx="2" ry="2" width="92" height="20" />
      <rect x="87" y="23" rx="2" ry="2" width="135" height="20" />
    </ContentLoader>
  );
};
