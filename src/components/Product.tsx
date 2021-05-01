import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import LocalOfferSharpIcon from '@material-ui/icons/LocalOfferSharp';
import {useSnackbar, VariantType,SnackbarProvider} from 'notistack';
import Skeleton from "@material-ui/lab/Skeleton";
import styled from 'styled-components'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from "@material-ui/core/IconButton";
import { red } from '@material-ui/core/colors';
import LongMenu from "./menus/ProductMenu";
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    root: {
        maxWidth: 320,
        minWidth: 300,
        margin: "3em",
        // marginLeft: "35em",
        border: '2px solid #e8eaf6',


    },
    media: {
        height: 140,
    },
});
const StyledRating = withStyles({
    iconFilled: {
        color: red[500],
    },
})(Rating);

interface ProductType {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

interface productProps {
    item?: ProductType; //note: required
}

const Product: React.FC<productProps> = () => {


    const classes = useStyles();
    const [product, setProduct] = useState<null | ProductType>(null);
    const [count,setCount]=useState(0);
    useEffect(() => {
        return () => {
            axios
                .get("https://fakestoreapi.com/products/1")
                .then((res: { data: ProductType }) => {
                    setProduct(res.data);
                });
        };
    }, []);
    //alert
    const {enqueueSnackbar} = useSnackbar();
    const handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(`${product?.title} est ajouter au panier`, {variant});
    };
    return (
        <React.Fragment>
            {product ? <Card className={classes.root} elevation={0}>
                <CardActionArea>
                    <CardHeader
                        avatar={<StyledRating
                            style={{margin: '10px'}}
                            defaultValue={2}
                            readOnly
                            aria-readonly={true}
                            name='rating'
                            size="small"
                            icon={<FavoriteIcon fontSize="inherit"/>}
                        />}
                       
                    />
                    <Image style={{backgroundImage:`url(${product?.image})`}} />
                        {/*<img src='/playstation.jpg' alt="product-1"/>*/}
                    {/*</Image>*/}
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" color="secondary">
                            {product?.category}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            {product?.title}

                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            {/*{product?.description}*/}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" color="primary">
                            <WrapperPrice><LocalOfferSharpIcon/><Price> {product?.price} DA</Price></WrapperPrice>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>

                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={()=>setCount(count-1)}disabled={count===0} ><RemoveIcon/></Button>
                        <Button disabled={true}>{count}</Button>
                        <Button onClick={()=>setCount(count+1)} disabled={false}><AddIcon/></Button>
                    </ButtonGroup>
                        <Tooltip title="Ajouter" aria-label="Ajouter" style={{marginLeft: "auto"}}>
                        <IconButton  onClick={handleClickVariant('success')} size="medium"
                        >
                            <Badge badgeContent={count} color="primary">
                            <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card> : <Skeleton variant="rect" width={300} height={320}/>

            }
        </React.Fragment >
    );
};

const IntegrationNotistack: React.FC<productProps> = ({item}) => {
    return (
        <SnackbarProvider maxSnack={3}>
            <Product item={item}/>
        </SnackbarProvider>
    );
}
export default IntegrationNotistack;

const WrapperPrice = styled.div`
            display:flex;
            align-items:center;
            justify-content:flex-start;
            `;
const Price = styled.span`
            margin:8px;
            `;
const Image = styled.div`
        background-size:contain;
         background-repeat: no-repeat;
           background-position: center;
         height:180px;
`;

// const Image = styled.div`
//             padding: 1.2rem;
//             padding-top:0.6rem;
//             height:180px;
//             img {
//             display: block;
//             margin-left: auto;
//             margin-right: auto;
//             max-width: 50%;
//         }
// `;
