import { ComponentType } from 'react';
import { Pod, ResourceProps, Resource } from '@console/shared';
import { KebabOption } from '@console/internal/components/utils';
import { Point } from '../../utils/svg-utils';

export interface TopologyDataResources {
  replicationControllers: Resource;
  pods: Resource;
  deploymentConfigs: Resource;
  services: Resource;
  routes: Resource;
  deployments: Resource;
  replicasets: Resource;
  buildconfigs: Resource;
  builds: Resource;
  daemonSets?: Resource;
  ksroutes?: Resource;
  configurations?: Resource;
  revisions?: Resource;
  ksservices?: Resource;
  statefulSets?: Resource;
}

export interface Node {
  id: string;
  type?: string;
  name?: string;
}

export interface Edge {
  id?: string;
  type?: string;
  source: string;
  target: string;
}

export interface Group {
  id?: string;
  type?: string;
  name: string;
  nodes: string[];
}

export interface GraphModel {
  nodes: Node[];
  edges: Edge[];
  groups: Group[];
}

export interface TopologyDataMap {
  [id: string]: TopologyDataObject;
}

export interface TopologyDataModel {
  graph: GraphModel;
  topology: TopologyDataMap;
}

export interface TopologyDataObject<D = {}> {
  id: string;
  name: string;
  type: string;
  resources: ResourceProps[];
  pods: Pod[];
  data: D;
}

export interface TopologyApplicationObject {
  id: string;
  name: string;
  resources: TopologyDataObject[];
}

export interface WorkloadData {
  url?: string;
  editUrl?: string;
  builderImage?: string;
  kind?: string;
  isKnativeResource?: boolean;
  donutStatus: {
    pods: Pod[];
    build: ResourceProps;
  };
}

export interface GraphApi {
  zoomIn(): void;
  zoomOut(): void;
  zoomReset(): void;
  zoomFit(): void;
  resetLayout(): void;
}

export enum GraphElementType {
  node = 'node',
  edge = 'edge',
  group = 'group',
}

export interface Selectable {
  selected?: boolean;
  onSelect?(): void;
}

export interface GroupElementInterface {
  isPointInGroup: (p: Point) => boolean;
}

export type ViewNode = {
  id: string;
  type?: string;
  x: number;
  y: number;
  size: number;
  name: string;
  fx?: number;
  fy?: number;
};

export type ViewEdge = {
  id: string;
  type?: string;
  nodeSize: number;
  source: ViewNode;
  target: ViewNode;
};

export type ViewGroup = {
  id: string;
  type?: string;
  name: string;
  nodes: ViewNode[];
  element?: GroupElementInterface;
};

export type NodeProps<D = {}> = ViewNode &
  Selectable & {
    data?: TopologyDataObject<D>;
    dragActive?: boolean;
    isDragging?: boolean;
    isTarget?: boolean;
    onHover?(hovered: boolean): void;
  };

export type DragConnectionProps = NodeProps & {
  dragX: number;
  dragY: number;
  isDragging?: boolean;
  onHover?(hovered: boolean): void;
};

export type EdgeProps<D = {}> = ViewEdge & {
  data?: TopologyDataObject<D>;
  dragActive?: boolean;
  isDragging?: boolean;
  targetArrowRef?(ref: SVGPathElement): void;
  onRemove?: () => void;
};

export type GroupProps = ViewGroup &
  Selectable & {
    dragActive?: boolean;
    dropSource?: boolean;
    dropTarget?: boolean;
    groupRef(element: GroupElementInterface): void;
  };

export type NodeProvider = (type: string) => ComponentType<NodeProps>;

export type EdgeProvider = (type: string) => ComponentType<EdgeProps>;

export type GroupProvider = (type: string) => ComponentType<GroupProps>;

export type ActionProvider = (type: GraphElementType, id: string) => KebabOption[];

export type ContextMenuProvider = {
  open: (type: GraphElementType, id: string, eventX: number, eventY: number) => boolean;
};
