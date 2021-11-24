using System;
using System.Collections.Generic;

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
                Console.Write(root.GetValue() + " ");
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
                        Console.Write(neighbor.GetValue() + " ");
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
                        Console.WriteLine(vertex1.GetValue() + " <-----> " + vertex2.GetValue());
                        vertex1.AddEdge(vertex2);
                    }
                }
            }
        }


        //public void CreateEdges()
        //{
        //    List<Vertex<T>> VerticesCopy = vertices;
        //    List<Vertex<T>> remainingVertices;
        //    foreach (Vertex<T> vertex in VerticesCopy)
        //    {
        //        VerticesCopy.Remove(vertex);
        //        remainingVertices = VerticesCopy;
        //        foreach (Vertex<T> remainingVertex in remainingVertices)
        //        {
        //            remainingVertices.
        //        }

        //        VerticesCopy.Remove(vertex);
        //    }
        //}


        //public void ColourGraph()
        //{
        //    List<Vertex<T>> VerticesCopy = vertices;
        //    List<Vertex<T>> remainingVertices;
        //    foreach (Vertex<T> vertex in VerticesCopy)
        //    {
        //        VerticesCopy.Remove(vertex);
        //        remainingVertices = VerticesCopy;
        //        foreach (Vertex<T> remainingVertex in remainingVertices)
        //        {
        //            remainingVertices.
        //        }

        //        VerticesCopy.Remove(vertex);
        //    }
        //}
    }
}
