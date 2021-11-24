using System.Collections.Generic;
using System.Text;

namespace Scheduler.Models
{
    public abstract class Vertex
    {
        int colour;
        List<Vertex> neighbors;
        bool isVisited;
        public List<Vertex> Neighbors { get { return neighbors; } set { neighbors = value; } }
        public bool IsVisited { get { return isVisited; } set { isVisited = value; } }
        public int NeighborsCount { get { return neighbors.Count; } }
        public int Colour { get { return colour; } set { colour = value; } }

        public Vertex()
        {
            isVisited = false;
            neighbors = new List<Vertex>();
            colour = 0;
        }

        public Vertex(List<Vertex> neighbors)
        {
            isVisited = false;
            this.neighbors = neighbors;
            colour = 0;
        }

        public void Visit()
        {
            isVisited = true;
        }

        public void AddEdge(Vertex vertex)
        {
            neighbors.Add(vertex);
        }

        public void AddEdges(List<Vertex> newNeighbors)
        {
            neighbors.AddRange(newNeighbors);
        }

        public void RemoveEdge(Vertex vertex)
        {
            neighbors.Remove(vertex);
        }

        public bool IsColoured()
        {
            if (colour != 0)
            {
                return true;
            }
            return false;
        }

        public abstract override string ToString();
        //{
        //    StringBuilder allNeighbors = new StringBuilder("");
        //    allNeighbors.Append(value + ": ");
        //    foreach (Vertex<T> neighbor in neighbors)
        //    {
        //        allNeighbors.Append(neighbor.value + "  ");
        //    }
        //    return allNeighbors.ToString();
        //}

        public abstract bool IsConnection(Vertex otherVertex);

        public abstract string GetValue();
    }
}

