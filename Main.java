
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public int maxAncestorDiff(TreeNode root) {
        Pair answer = recursive(root);
        return answer.difference;
    }

    public Pair recursive(TreeNode root) {
        if (root == null)
            return new Pair(-1, 0);
        if (root.left == null && root.right == null)
            return new Pair(root.val, 0);
        Pair smallestLeft = recursive(root.left);
        Pair smallestRight = recursive(root.right);
        int rootDifference = 0;

        if (smallestLeft.smallest != -1)
            rootDifference = Math.abs(root.val - smallestLeft.smallest);
        else
            smallestLeft.smallest = 0;

        if (smallestRight.smallest != -1)
            rootDifference = Math.max(rootDifference, Math.abs(root.val - smallestRight.smallest));
        else
            smallestRight.smallest = 0;

        return new Pair(Math.max(rootDifference, Math.max(smallestLeft.difference, smallestRight.difference)),
                Math.min(root.val, Math.min(smallestLeft.smallest, smallestRight.smallest)));
    }
}

class Pair {
    int smallest;
    int difference;

    public Pair(int smallest, int difference) {
        this.smallest = smallest;
        this.difference = difference;
    }
}

class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        TreeNode root = new TreeNode(1);
        root.right = new TreeNode(2);
        root.right.right = new TreeNode(0);
        root.right.right.left = new TreeNode(3);
        System.out.println(s.maxAncestorDiff(root));
    }
}
