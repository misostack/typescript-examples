type AN_UNION_TYPE = number & any;

type AN_INTERSECT_TYPE = string | number;

let anUnionVariable: AN_UNION_TYPE;
anUnionVariable = 1;

let anIntersectType: AN_INTERSECT_TYPE;
anIntersectType = 1;
anIntersectType = '1';

// LEFT JOIN TYPE

interface Category {
  categoryId: string;
  categoryName: string;
  numberOfPosts: number;
}
interface Post {
  postId: string;
  postName: string;
  categoryId: string;
  categoryName: string;
  views: number;
}
