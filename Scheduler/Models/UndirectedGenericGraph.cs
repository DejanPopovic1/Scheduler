using System;
using System.Collections.Generic;
using System.Linq;

//See: https://codereview.stackexchange.com/questions/131583/generic-graph-implementation-in-c
namespace Scheduler.Models
{
    public class UndirectedGenericGraph<T>
    {
        private List<Vertex> vertices;
        int size;
        public List<Vertex> Vertices { get { return vertices; } }
        public int Size { get { return vertices.Count; } }

        public int NumberOfEdges {
            get {
                int result = 0;
                foreach (var vertex in Vertices)
                {
                    //Console.WriteLine(vertex.GetValue() + ": " + vertex.NeighborsCount);
                    result += vertex.NeighborsCount;
                }
                result /= 2;
                return result; 
            } 
        }

        public int ColouringNumber
        {
            get
            {
                return Vertices.Select(x => x.Colour).Distinct().Count();
            }
        }

        public UndirectedGenericGraph(int initialSize)
        {
            if (size < 0)
            {
                throw new ArgumentException("Number of vertices cannot be negative");
            }
            size = initialSize;
            vertices = new List<Vertex>(initialSize);
        }

        public UndirectedGenericGraph(List<Vertex> initialNodes)
        {
            vertices = initialNodes;
            size = vertices.Count;
        }

        public void AddVertex(Vertex vertex)
        {
            vertices.Add(vertex);
        }

        public void RemoveVertex(Vertex vertex)
        {
            vertices.Remove(vertex);
        }
        public bool HasVertex(Vertex vertex)
        {
            return vertices.Contains(vertex);
        }

        public void DepthFirstSearch(Vertex root)
        {
            if (!root.IsVisited)
            {
                Console.Write(root.ToString() + " ");
                root.Visit();
                foreach (Vertex neighbor in root.Neighbors)
                {
                    DepthFirstSearch(neighbor);
                }
            }
        }

        public void BreadthFirstSearch(Vertex root)
        {
            Queue<Vertex> queue = new Queue<Vertex>();
            root.Visit();
            queue.Enqueue(root);
            while (queue.Count > 0)
            {
                Vertex current = queue.Dequeue();
                foreach (Vertex neighbor in current.Neighbors)
                {
                    if (!neighbor.IsVisited)
                    {
                        Console.Write(neighbor.ToString() + " ");
                        neighbor.Visit();
                        queue.Enqueue(neighbor);
                    }
                }
            }
        }

        public void CreateEdgesUnoptimised()
        {
            foreach (Vertex vertex1 in Vertices)
            {
                foreach (Vertex vertex2 in Vertices)
                {
                    if (vertex1.IsConnection(vertex2) && vertex1 != vertex2)
                    {
                        vertex1.AddEdge(vertex2);
                    }
                }
            }
        }

        public void ColourGraph()
        {
            foreach (var vertex in Vertices)
            {
                vertex.Colour = 0;
                bool isAnyNeighbourSameColour = true;
                while (isAnyNeighbourSameColour)
                {
                    vertex.Colour++;
                    isAnyNeighbourSameColour = IsAnyVertexColour(vertex.Neighbors, vertex.Colour);
                }
            }
        }

        private bool IsAnyVertexColour(List<Vertex> vertices, int colour)
        {
            foreach (Vertex vertex in vertices)
            {
                if (vertex.Colour == colour)
                {
                    return true;
                }
            }
            return false;
        }

        public override string ToString()
        {
            List<string> result = new List<string>();
            foreach (Vertex vertex in vertices)
            {
                string graphVertexToString = string.Format("{0}     |     {1}", vertex.ToString(), vertex.Colour);
                result.Add(graphVertexToString);
            }
            return string.Join("\n", result);
        }
    }
}
