import { Node, Grid } from './Node';
export default function Dijkstra(start: Node, end: Node, walls: Node[], grid: Grid) {
    let open: Node[] = [start];
    let distances: number[][] = grid.nodes.map((row) => row.map((node) => Infinity));
    let path: Node[] = [];
    let current: Node = start;
    distances[start.x][start.y] = 0;

    while (!end.visited && open.length > 0) {
        // remove all walls from the set of neighbors
        if (walls.length > 0) current.neighbors = current.neighbors.filter((node) => !walls.includes(node))
        // prioritize ending over maximizing value
        if (current.neighbors.includes(end)) {
            current.visited = true
            end.visited = true
            end.prev = current
            break
        }
        // update distances for each neighbor
        current.neighbors.forEach((node) => {
            // minimize distance - if new path is smaller -> swap
            if (node.visited) return;
            const swap = distances[node.x][node.y] > distances[current.x][current.y] + node.weight
            if (swap) {
                distances[node.x][node.y] = distances[current.x][current.y] + node.weight
                node.prev = current
            }
            // add each to open if not included already
            if (!open.includes(node)) open.push(node)
        })
        // done with current node
        current.visited = true
        // remove visited node
        open = open.filter((node) => !node.visited)
        // find the open node with the smallest distance
        const values = open.map((node) => distances[node.x][node.y])
        const index = values.indexOf(Math.min(...values))
        current = open[index];
    }
    // track path back from end
    let trace: Node|null = end
    while (trace) {
        if (trace===null) break
        path.push(trace)
        trace = trace?.prev
    }

    return path.reverse()
}