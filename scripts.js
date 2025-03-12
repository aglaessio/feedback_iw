body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 1rem;
}

.container {
    background: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    color: #555;
    font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
}

.form-group textarea {
    resize: vertical;
}

button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    margin-top: 0.5rem;
}

button:hover {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
        max-width: 90%;
    }

    h1 {
        font-size: 1.25rem;
    }

    .form-group label {
        font-size: 0.85rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.5rem;
        font-size: 0.9rem;
    }

    button {
        padding: 0.75rem;
        font-size: 0.9rem;
    }
}
