import styled from 'styled-components';

export const PageWrapper = styled.section`
    overflow: auto;
    background-color: #d9d9d9;
`

export const PageContainer = styled.div`
    position: absolute;
    top: 90px;
    left: 0px;
    bottom: 10px;
    right: 16px;
    padding: 30px; 
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: orange; 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255,0,0,0.4); 
    }

    display: grid;
    grid-template-areas: 'navi navi navi' 
                         'a b c';
    grid-template-rows: 8% 92%;
    grid-template-columns: 1fr 2fr 1fr;
`

export const LeftContent = styled.div`
    grid-area: a;
`

export const MainContent = styled.div`
    grid-area: b;
`

export const RightContent = styled.div`
    grid-area: c;
`