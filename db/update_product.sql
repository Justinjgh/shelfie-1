UPDATE products
SET name = $2,
    price= $3,
    image_url =$4
WHERE product_id = $1