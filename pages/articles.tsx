import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType} from "next";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const articles = ({articles}: Props) => {
  // articles component
  return (
    <div>
      <h2>記事一覧(SSG)</h2>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.id}>
              {article.attributes.Title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default articles


// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch("http://localhost:1337/api/articles?populate=*", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer xxxx"
    },
    credentials: "include",
    redirect: 'follow'
  })
  .then((response) => {
      return response.json();
      // fetch成功の場合
  })
  .catch((error) => {
      console.log(error)
      // fetch失敗の場合
  })
  // Pass data to the page via props
  return {
    props: {
      articles: res.data
    }
  }

}