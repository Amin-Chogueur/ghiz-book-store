import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import ProductDetails from "../components/product/ProductDetails";
import { FiArrowLeft } from "react-icons/fi";
import { fetchStationeryItem } from "../store/slices/stationery/stationeryThunk";

export default function StationeryDetails() {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const { stationeryItem, stationeryLoading } = useAppSelector(
    (state) => state.stationery
  );
  console.log(stationeryItem);
  useEffect(() => {
    dispatch(fetchStationeryItem(title as string));
  }, [dispatch, title]);
  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Détails de l’article
      </h1>
      {stationeryItem && stationeryItem.quantity === 0 && (
        <h2 className="text-center text-lg text-orange-500  md:w-[60%] mx-auto mb-10">
          Ce livre est actuellement indisponible. Contactez-nous via le{" "}
          <Link to={"/contact"} className="underline">
            formulaire de contact
          </Link>{" "}
          ou par téléphone pour le commander.
        </h2>
      )}
      {stationeryLoading === "pending" ? (
        <Spinner />
      ) : (
        <>
          <Link
            to={"/Papeterie"}
            className="flex gap-2 items-center mb-4 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour</span>
          </Link>
          {stationeryItem && <ProductDetails product={stationeryItem} />}
        </>
      )}
    </div>
  );
}
