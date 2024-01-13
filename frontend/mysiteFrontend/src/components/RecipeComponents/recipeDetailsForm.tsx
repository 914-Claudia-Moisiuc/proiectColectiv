import React, { useState, useEffect, CSSProperties } from "react";
import { Recipe } from "../../models/Recipe";
import { Ingredient } from "../../models/Ingredient";

const RecipeDetailsForm = (props: { recipeId: any }) => {
	const [recipe, setRecipe] = useState<Recipe>({});
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/${props.recipeId}/?format=json`
                );
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/ingredient/?format=json"
                );
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDownloadPDF = async () => {
        try {
            // Assuming there is an endpoint on the backend for generating and serving the PDF
            const response = await fetch(`http://127.0.0.1:8000/recipe/${props.recipeId}/download/`, {
                method: "GET",
                headers: {
                    Accept: "application/pdf",
                },
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = recipe.name + "_details.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    useEffect(() => {
        setFormData({
            difficulty: recipe.difficulty,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            time_min: recipe.time_min,
            time_max: recipe.time_max,
            number_people: recipe.number_people,
            type_recipe: recipe.type_recipe,
            estimated_price: recipe.estimated_price,
            total_calories: recipe.total_calories,
            photo: recipe.photo,
        });
        console.log("Photo URL:", recipe.photo);
        console.log("Recipe:", recipe);
    }, [recipe]);

    useEffect(() => {
        const recipeIngredients = ingredients.filter((ingredient) => recipe.ingredients.indexOf(ingredient.id) > -1);
        setIngredientNames([]);
        recipeIngredients.forEach(ingredient => setIngredientNames(ingredientArr => [...ingredientArr, ingredient.name]));
    }, [ingredients]);

    const [formData, setFormData] = useState({
        difficulty: 0,
        name: "",
        description: "",
        ingredients: [],
        time_min: 0,
        time_max: 0,
        number_people: 0,
        type_recipe: "",
        estimated_price: 0,
        total_calories: 0,
        photo: ""
    });

    const [ingredientNames, setIngredientNames] = useState<string[]>([]);

    const handleCancel = () => {
        window.location.href = `/showlist/`;
    };
    return (
        <div style={styles.overlay}>
            <div style={styles.modal} modal-class="modal-fullscreen">
                <div style={styles.header}>
                    <button onClick={handleDownloadPDF}>Download PDF</button>
                    <button style={styles.exitButton} onClick={handleCancel}>
                        Exit
                    </button>
                </div>
                <h1>{recipe.name}</h1>
                {formData.photo && (
                    <div>
                        <img src={formData.photo} alt="My Image"/>
                    </div>
                )}
                <h2>Recipe Information: </h2>
                <p><small><i>{"Difficulty: ".concat(String(formData.difficulty))}</i></small></p>
                <p><small><i>{"Estimated Time: ".concat(String(formData.time_min))} - {formData.time_max}</i></small>
                </p>
                <p><small><i>{"Number of People: ".concat(String(formData.number_people))}</i></small></p>
                <p><small><i>{"Recipe Type: ".concat(formData.type_recipe)}</i></small></p>
                <p><small><i>{"Estimated Price: ".concat(String(formData.estimated_price))}</i></small></p>
                <p><small><i>{"Total Calories: ".concat(String(formData.total_calories))} </i></small></p>
                <h2>Ingredients: </h2>
                <p>{ingredientNames.join(", ")}</p>
                <h2>Description:</h2>
                <p>{formData.description}</p>


            </div>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        background: "#000",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        textAlign: "left",
        width: "80%", // Set the width as needed
        height: "80%", // Set the height as needed
        overflow: "auto", // Add scrollbar if content exceeds the available space
        boxSizing: "border-box",
    },
    form: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
    },
    label: {
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        padding: "10px",
        marginTop: "10px",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },

    exitButton: {
        background: "none",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
    },

    content: {
        overflow: "auto", // Add scrollbar if content exceeds the available space
        maxHeight: "calc(100% - 40px)", // Set the maximum height, considering header and padding
    },
};

export default RecipeDetailsForm;