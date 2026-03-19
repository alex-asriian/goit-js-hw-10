import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const delay = Number(e.currentTarget.elements.delay.value);
    const state = e.currentTarget.elements.state.value;

    createPromise(delay, state)
        .then((res) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${res}ms`,
            position: 'topRight',
         })
        })
        .catch((err) => {
            iziToast.error({
                message: `❌ Rejected promise in ${err}ms`,
                position: 'topRight',
             })
        })
    form.reset();
    })

function createPromise(delay, state) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                res(delay);
            } else {
                rej(delay);
            }
        }, delay);
    });
}
    






