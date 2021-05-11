import fs from 'fs'; //filesystem package, to read the md files
import matter from 'gray-matter'
import styled from "styled-components"
import Page from "../../components/styled/Page"

const Title = styled.div`
    display: flex;
    align-items: flex-end;
`
const SubTitle = styled.p`
    padding: 0.75rem 0.5rem;
`

const Price = styled.span`
    font-size: 2rem;
    background: blue;
    padding: 0.25rem 1rem;
    color: white;
    font-weight: 800;
    border-radius: 5px;
`


const Product = ({ product: { data, content } }) => {
    return (
        <Page>
            <Title>
                <h1>{data.name}</h1>
                <SubTitle>{data.description}</SubTitle>
            </Title>

            <Price>{data.price}</Price>
            <h5>{content}</h5>

        </Page>
    )
};

export const getStaticPaths = () => {
    //products page to generate
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const paths = filenames.map(filename => {
        return {
            params: {
                product: filename.replace('.md', ''),
            }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

//we use the getstaticprops to inject static values to our component 
export const getStaticProps = async (context) => {

    const productName = context.params.product;
    //context.params.product = [product]
    const filePath = `${process.cwd()}/content/${productName}.md`;
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content } = matter(fileContent);
    return {
        props: {
            product: {
                data,
                content
            },
        },
    };
};

export default Product;
