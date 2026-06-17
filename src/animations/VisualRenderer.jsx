import {
  ArrayHashRenderer,
  TwoPointersRenderer,
  SlidingWindowRenderer,
  StackRenderer,
  TreeBfsRenderer,
  Dp1dRenderer,
  GenericRenderer,
} from './renderers/SceneRenderers';

export default function VisualRenderer({ visuals, caption, reduced }) {
  if (!visuals?.type) {
    return <GenericRenderer caption={caption} />;
  }

  switch (visuals.type) {
    case 'array-hash':
      return <ArrayHashRenderer visuals={visuals} reduced={reduced} />;
    case 'two-pointers':
      return <TwoPointersRenderer visuals={visuals} reduced={reduced} />;
    case 'sliding-window':
      return <SlidingWindowRenderer visuals={visuals} reduced={reduced} />;
    case 'stack':
      return <StackRenderer visuals={visuals} reduced={reduced} />;
    case 'tree-bfs':
      return <TreeBfsRenderer visuals={visuals} reduced={reduced} />;
    case 'dp-1d':
      return <Dp1dRenderer visuals={visuals} reduced={reduced} />;
    default:
      return <GenericRenderer caption={caption} />;
  }
}
