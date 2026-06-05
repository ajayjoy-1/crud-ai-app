from rest_framework import viewsets
from .serializers import PersonSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Person, ChatMessage
from google import genai
from django.conf import settings

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

# 1. Authenticate with your secret key
# Grab the key securely from settings, not a hardcoded string
client = genai.Client(api_key=settings.GEMINI_API_KEY)

@api_view(['GET', 'POST'])
def ai_chat_handler(request):
    if request.method == 'GET':
        history = ChatMessage.objects.all().order_by('created_at').values()
        return Response(history)

    elif request.method == 'POST':
        user_text = request.data.get('prompt')
        
        if not user_text:
            return Response({'error': 'Prompt is required'}, status=400)

        try:
            # 3. USE THE NEW SYNTAX TO CALL THE AI
            # We are using gemini-2.5-flash, which is the current default
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=user_text,
            )
            
            # 4. SAVE TO DATABASE (Using response.text)
            chat_record = ChatMessage.objects.create(
                user_prompt=user_text,
                ai_response=response.text
            )
            
            return Response({
                'id': chat_record.id,
                'user_prompt': chat_record.user_prompt,
                'ai_response': chat_record.ai_response
            })
            
        except Exception as e:
            print("🚨 AI ERROR:", str(e))
            return Response({'error': str(e)}, status=500)