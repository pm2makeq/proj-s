import 'fabric';
import $ from 'jquery';
import './styles.css';

$(document).ready(function() {
    // 캔버스 초기화
    const canvas = new fabric.Canvas('canvas', {
        width: 800,
        height: 600,
        selection: true // 다중 선택 허용
    });

    // 이미지 업로드 처리
    $('#imageUpload').on('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            fabric.Image.fromURL(event.target.result, function(img) {
                // 캔버스 크기에 맞게 이미지 크기 조정
                const scale = Math.min(
                    canvas.width / img.width,
                    canvas.height / img.height
                );

                img.set({
                    scaleX: scale,
                    scaleY: scale
                });

                // 기존 캔버스의 모든 객체 제거
                canvas.clear();
                
                // 이미지를 배경으로 설정
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    originX: 'left',
                    originY: 'top'
                });
            });
        };

        reader.readAsDataURL(file);
    });

    // 사각형 추가
    $('#addRect').on('click', function() {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'rgba(255, 0, 0, 0.5)',
            width: 100,
            height: 100,
            strokeWidth: 2,
            stroke: '#ff0000'
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
    });

    // 원 추가
    $('#addCircle').on('click', function() {
        const circle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: 'rgba(0, 255, 0, 0.5)',
            radius: 50,
            strokeWidth: 2,
            stroke: '#00ff00'
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
    });

    // 텍스트 추가
    $('#addText').on('click', function() {
        const text = new fabric.IText('텍스트를 입력하세요', {
            left: 100,
            top: 100,
            fill: '#000000',
            fontSize: 20,
            fontFamily: 'Arial'
        });
        canvas.add(text);
        canvas.setActiveObject(text);
    });

    // 선택된 객체 삭제
    $('#delete').on('click', function() {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    });

    // 키보드 삭제 키 처리
    $(document).on('keyup', function(e) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            const activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type !== 'image') {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        }
    });
});