import fs from 'fs'; //filesystem package, to read the md files
import matter from 'gray-matter'
import Link from 'next/link'
import styled from "styled-components"
import UnstyledLink from '../components/styled/UnstyledLink'
import useCart from '../hooks/useCart'

const Container = styled.div`
    background:white;
    padding: 1rem 2rem;
    min-height:200px;
    position: relative;
    transition: transform 0.3s;

    &:hover{
        transform: scale(1.02);
    }
`
const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    margin: 0.5rem 0;
`

const Price = styled.span`
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 2rem;
`

const renderProduct = (product, addItemToCart) => {

    const handleClick = (e) => {
        e.stopPropagation();
        addItemToCart(product);
    }

    return (
        <Link key={product.id} href={product.slug}>
            <UnstyledLink>
                <Container>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <button onClick={handleClick}>Add to cart </button>

                    <Price>{product.price}€</Price>
                </Container >
            </UnstyledLink>
        </Link >

    )
}
const HomePage = (props) => {
    const { cart, addItemToCart } = useCart(); //destructure the return (to be possible to use the hook)

    return (
        <ProductsContainer>
            {props.products.map((product => renderProduct(product, addItemToCart)))
            }
        </ProductsContainer>
    )




};

export const getStaticProps = async () => {

    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory)

    const products = filenames.map(filename => {
        // read the file from fs
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
        // pull out frontmatter => name
        const { data } = matter(fileContent)
        // return name, slug
        const slug = `/products/${filename.replace('.md', '')}`
        const product = {
            ...data,
            slug
        }
        return product;
    })
    return {
        props: {
            products
        }
    }

}
export default HomePage;