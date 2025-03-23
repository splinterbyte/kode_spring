import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={104}
    height={104}
    viewBox="0 0 104 104"
    backgroundColor="#f7f7f7"
    foregroundColor="#e1e1e1"
  >
    <circle cx="52" cy="52" r="52" />
  </ContentLoader>
);

export const SkeletonSpan = () => (
  <ContentLoader
    speed={1}
    width={110}
    height={20}
    viewBox="0 0 110 20"
    backgroundColor="#f7f7f7"
    foregroundColor="#e1e1e1"
  >
    <rect x="-5" y="2" rx="0" ry="0" width="127" height="15" />
    <rect x="79" y="7" rx="0" ry="0" width="3" height="0" />
    <rect x="69" y="7" rx="0" ry="0" width="0" height="3" />
    <rect x="70" y="7" rx="0" ry="0" width="0" height="3" />
  </ContentLoader>
);
